/**
 * DocumentController
 *
 * @description :: Server-side logic for managing Documents
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	index: function (req, res) {
		res.view();
	},

	upload: function (req, res) {
		Category
			.find()
			.exec(function (error, categories) {
				res.view({
					categories: categories,
					document: ''
				});
			});
	},

	getDocuments: function (req, res) {
		var perPage = 10,
			columns = {
				0: 'id',
				1: 'category',
				2: 'name',
				3: 'description',
				4: 'createdAt',
				5: 'updatedAt'
			},
			search = req.query.search.value,
			searchQuery = ['%', search, '%'].join(''),
			searchObj = {},
			start = req.query.start,
			orderBy = columns[Helper.getUrlParameter('order[0][column]', decodeURIComponent(req._parsedOriginalUrl.path))] || 'id ASC',
			orderDirection =  req.query.order[0].dir || '';

		if (search.length) {
			searchObj = {
				or: [{
					name: searchQuery
				},{
					createdDate: searchQuery
				}]
			};
		}

		Document.count(function (err, numOfDocuments) {

			Category
				.find()
				.where({
					name: searchQuery
				})
				.exec(function (error, categories) {
					var catArr = [];

					if (categories.length) {
						categories.map(function (item) {
							catArr.push(item.id);
						});

						if (search.length) {
							searchObj.or.push({
								category: catArr
							});
						}

					}					

					Document
						.find({
							where: searchObj,
							limit: perPage,
							skip: start,
							sort: [orderBy, ' ', orderDirection].join('')
						})
						.populate('category')
						.exec(function (error, documents) {
							if (error) {
								console.log(error);
							}

							if (!documents.length) {
								return res.json({
									data: [],
									recordsTotal: 0,
									recordsFiltered: 0
								});
							}

							var dataArr = [];

							documents.map(function (item) {
								dataArr.push([
									item.id,
									item.category && item.category.name,
									item.name,
									item.description,
									item.createdDate,
									item.updatedDate,
									'<a href="/document/edit/' + item.id + '" class="btn btn-info btn-sm btn-edit" title="Edit"><span class="glyphicon glyphicon-edit"></span></a>&nbsp;' +
									'<a href="/document/download/' + item.id + '" class="btn btn-info btn-sm" title="Download"><span class="glyphicon glyphicon-download-alt"></span></a>&nbsp;' +
									'<a href="/document/delete/' + item.id + '" class="btn btn-danger btn-sm btn-delete" title="Delete"><span class="glyphicon glyphicon-remove"></span></a>'
								]);
							});

							res.json({
								data: dataArr,
								recordsTotal: numOfDocuments,
								recordsFiltered: numOfDocuments
							});
						});
				});
		});
	},

	uploadDocument: function (req, res) {
		req.file('document').upload(function whenDone(error, uploadedFile) {
			if (error) {
				return res.serverError(error);
			}

			if (uploadedFile.length) {
				req.params.all().path = uploadedFile[0].fd;
			}

			Document.create(req.params.all(), function () {
				res.redirect('/document');
			});
		});
	},

	download: function (req, res) {
		if (!req.param('id')) {
			res.redirect('/document');
		}

		Document
			.find({
				where: {
					id: req.param('id')
				}
			})
			.exec(function (error, document) {
				if (!document.length || !document[0].path) {
					res.redirect('/document');
					return;
				}

				require('fs')
					.createReadStream(document[0].path)
				    .on('error', function (err) {
				      return res.serverError(err);
				    })
				    .pipe(res);
			});
	},

	delete: function (req, res) {
		if (!req.param('id')) {
			res.redirect('/document');
		}

		Document
			.destroy(req.param('id'))
			.exec(function (error) {
				if (error) {
					return res.serverError(error);
				}

				res.redirect('/document');
			});
	},

	edit: function (req, res) {
		if (!req.param('id')) {
			res.redirect('/document');
		}

		Category
			.find()
			.exec(function (error, categories) {
				Document
					.findOne({ id: req.param('id') })
					.populate('category')
					.exec(function (error, document) {
						if (error) {
							return res.serverError(error);
						}

						res.view('document/upload', {
							layout: null,
							document: document,
							categories: categories
						});
					});
			});
	},

	update: function (req, res) {
		if (!req.params.all().id) {
			res.redirect('/document');
		}

		Document.update(req.params.all().id, req.params.all(), function () {
			res.redirect('/document');
		});
	}

};

