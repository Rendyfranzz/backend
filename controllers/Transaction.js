import { Jadwal, Transaction, Users } from "../models/UserModel.js";
import { Op } from "sequelize";

export const getTransaction = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search_query || "";
        const offset = limit * page;
        const totalRows = await Transaction.count({
            where: {
                name: {
                    [Op.like]: '%' + search + '%'
                }
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await Transaction.findAll({
            include: [{
                model: Users
            }, {
                model: Jadwal
            }],
            where: {
                name: {
                    [Op.like]: '%' + search + '%'
                }
            },
            offset: offset,
            limit: limit,
            order: [
                ['name', 'ASC']
            ]
        });
        res.status(200).json({
            result: result,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage
        })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getIncome = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.month_query || "";
        const offset = limit * page;
        const totalRows = await Transaction.count({
            where: {
                name: {
                    [Op.like]: '%' + search + '%'
                }
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await Transaction.findAll({
            where: {
                tanggal: {
                    [Op.like]: '%' + month + '%'
                }
            },
            offset: offset,
            limit: limit,
            order: [
                ['name', 'ASC']
            ]
        });
        res.status(200).json({
            result: result,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage
        })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getTransactionByUuid = async (req, res) => {
    try {
        const response = await Transaction.findAll({
            include: [{
                model: Jadwal
            }],
            where: {
                userid: req.params.id
            }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
export const getTransactionByid = async (req, res) => {
    try {
        const response = await Transaction.findOne({
            where: {
                transuuid: req.params.id,
            }
        })
        res.status(200).json(response)
    } catch (err) {
        console.log(err);
    }

}
export const createTransaction = async (req, res) => {
    const { name, price, lunas, tanggal, timeid, qrId, pesan } = req.body
    try {
        await Transaction.create({
            name: name,
            price: price,
            lunas: lunas,
            pesan: pesan,
            tanggal: tanggal,
            timeid: timeid,
            qrId: qrId,
            userid: req.userId
        });
        res.status(201).json({ msg: "Transaksi berhasil" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const getStatusTransaction = async (req, res) => {
    const date = req.query.date
    const time = req.query.time
    console.log({ date, time });
    try {
        const response = await Transaction.findOne({
            where: {
                tanggal: date,
                timeid: time,
                lunas: "lunas"
            }
        })
        res.status(200).json(response)
    } catch (err) {
        console.log(err);
    }
}
export const updateStatus = async (req, res) => {
    try {
        await Transaction.update({
            lunas: req.body.lunas
        }, {
            where: {
                transuuid: req.params.id
            }
        })
        res.status(200).json({ msg: "Update berhasil" })
    } catch (err) {
        res.status(400).json(err)
    }
}
export const deleteTransaction = async (req, res) => {
    let id = req.params.id
    try {
        await Transaction.destroy({
            where: {
                transuuid: req.params.id
            }
        });
        res.status(200).json({ msg: "hapus berhasil" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
