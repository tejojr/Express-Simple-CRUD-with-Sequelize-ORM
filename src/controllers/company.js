const modCompany = require("../models").Company

module.exports = {
  findAll: async (req, res) => {
    try {
      const execute = await modCompany.findAll({
        order: [["name", "ASC"]]
      })
      res.json({
        status: 201,
        message: "Success",
        data: execute
      })
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: e.message || "some error"
      })
    }
  },
  findById: async (req, res) => {
    try {
      const execute = await modCompany.findByPk(req.params.id)
      if (!execute) {
        res.json({
          status: 400,
          message: "Data Not Found"
        })
      } else {
        res.json({
          status: 201,
          message: "Success",
          data: execute
        })
      }
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: e.message || "some error"
      })
    }
  },
  create: async (req, res) => {
    try {
      const data = { ...req.body }
      const exist = await modCompany.count({
        where: {
          name: data.name
        }
      })
      if (exist > 0) {
        res.json({
          status: 409,
          message: "Duplicate Name COmpany"
        })
      } else {
        const execute = await modCompany.create(data)
        res.json({
          status: 201,
          message: "Success",
          data: execute
        })
      }
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: e.message || "some error"
      })
    }
  },
  update: async (req, res) => {
    try {
      const data = { ...req.body }
      const exist = await modCompany.findByPk(req.params.id)
      if (exist) {
        const execute = await modCompany.update(data, {
          where: {
            id: req.params.id
          }
        })
        const newData = await modCompany.findByPk(req.params.id)
        res.json({
          status: 201,
          message: "Success",
          data: newData
        })
      } else {
        res.json({
          status: 400,
          message: "Data Not FOund"
        })
      }
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: e.message || "some error"
      })
    }
  },
  destroy: async (req, res) => {
    try {
      const exist = await modCompany.findByPk(req.params.id)
      if (exist) {
        const execute = await modCompany.destroy({
          where: {
            id: req.params.id
          }
        })
        res.json({
          status: 201,
          message: "Success",
          data: req.params.id
        })
      } else {
        res.json({
          status: 400,
          message: "Data Not FOund"
        })
      }
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: e.message || "some error"
      })
    }
  }
}
