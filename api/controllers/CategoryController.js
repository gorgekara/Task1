/**
 * CategoryController
 *
 * @description :: Server-side logic for managing Categories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var moment = require('moment');

module.exports = {
	
	index: function (req, res) {
		res.view();
	},

	new: function (req, res) {
		res.view({
			category: ''
		});
	},

	create: function (req, res) {
		Category.create(req.params.all(), function () {
			res.redirect('/category');
		});
	},

	getCategories: function (req, res) {
		var perPage = 10,
			columns = {
				1: 'id',
				2: 'category.name',
				5: 'createdAt',
				6: 'updatedAt'
			},
			start = req.query.start,
			orderBy = columns[Helper.getUrlParameter('order[0][column]', decodeURIComponent(req._parsedOriginalUrl.path))] || 'valStatus ASC',
			orderDirection =  req.query.order[0].dir || '';

		Category.count(function (err, numOfCategories) {
			Category
				.find({
					limit: perPage,
					skip: start,
					sort: [orderBy, ' ', orderDirection].join('')
				})
				.exec(function (error, categories) {
					if (error) {
						console.log(error);
					}

					if (!categories.length) {
						return res.json({
							data: [],
							recordsTotal: 0,
							recordsFiltered: 0
						});
					}

					var dataArr = [];

					categories.map(function (item) {
						dataArr.push([
							item.id,
							item.name,
							moment(item.createdAt).format('DD/MM/YYYY'),
							moment(item.updatedAt).format('DD/MM/YYYY'),
							'<a href="/category/edit/' + item.id + '" class="btn btn-info btn-sm btn-edit" title="Edit"><span class="glyphicon glyphicon-edit"></span></a>&nbsp;' +
							'<a href="/category/delete/' + item.id + '" class="btn btn-danger btn-sm btn-delete" title="Delete"><span class="glyphicon glyphicon-remove"></span></a>'
						]);
					});

					res.json({
						data: dataArr,
						recordsTotal: numOfCategories,
						recordsFiltered: numOfCategories
					});
				});
		});
	},

	delete: function (req, res) {
		if (!req.param('id')) {
			res.redirect('/category');
		}

		Category
			.destroy(req.param('id'))
			.exec(function (error) {
				if (error) {
					return res.serverError(error);
				}

				res.redirect('/category');
			});
	},

	edit: function (req, res) {
		if (!req.param('id')) {
			res.redirect('/category');
		}

		Category
			.findOne({ id: req.param('id') })
			.exec(function (error, category) {
				if (error) {
					return res.serverError(error);
				}

				res.view('category/new', {
					layout: null,
					category: category
				});
			});
	},

	update: function (req, res) {
		Category.update(req.params.all().id, req.params.all(), function () {
			res.redirect('/category');
		});
	}
	
};

