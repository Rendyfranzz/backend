import { Users } from "../models/UserModel.js";
import argon2 from "argon2"
import { Op } from "sequelize";


export const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

}

export const getUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Users.count({
        where: {
            [Op.or]: [{
                name: {
                    [Op.like]: '%' + search + '%'
                }
            }, {
                email: {
                    [Op.like]: '%' + search + '%'
                }
            }]
        }
    });
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Users.findAll({
        where: {
            [Op.or]: [{
                name: {
                    [Op.like]: '%' + search + '%'
                }
            }, {
                email: {
                    [Op.like]: '%' + search + '%'
                }
            }]
        },
        offset: offset,
        limit: limit,
        order: [
            ['name', 'ASC']
        ]
    });
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    });
}
export const createUsers = async (req, res) => {
    const { name, email, password, confPassword, role, hp } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "password tidak cocok" })
    const isOne = await Users.findOne({
        where: {
            email: email
        }
    })
    if (isOne) return res.status(400).json({ msg: "Email telah digunakan" })
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            hp: hp,
            role: role
        });
        res.status(201).json({ msg: "register berhasil" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
export const updateUsers = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "user tidak ditemukan" })
    const { name, email, password, confPassword, role } = req.body;
    let hashPassword;
    if (password === "" || password === null) {
        hashPassword = user.password;
    } else {
        hashPassword = await argon2.hash(password);
    }
    if (password !== confPassword) return req.status(400).json({ msg: "password tidak cocok" })
    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where: {
                uuid: user.uuid
            }
        });
        res.status(200).json({ msg: "Update berhasil" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
export const deleteUsers = async (req, res) => {
    let id = req.params.id
    console.log(typeof req.params.id)
    try {
        await Users.destroy({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "hapus berhasil" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}