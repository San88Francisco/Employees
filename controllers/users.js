/**
 * 
 * @route POST /api/user/login
 * @desc логін
 * @access Public
 */

const { prisma } = require('../prisma/prisma-client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const login = async (req, res) => {
   try {
      const { email, password } = req.body
      if (!email || !password) {
         return res.status(400).json({ message: 'Будь ласка, заповніть обов`язкові поля' })
      }

      const user = await prisma.user.findFirst({
         where: {
            email,
         }
      })

      const isPasswordCorrect = user && (await bcrypt.compare(password, user.password))
      const secret = process.env.JWT_SECRET


      if (user && isPasswordCorrect && secret) {
         res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name,
            toker: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
         })
      } else {
         return res.status(400).json({ message: 'Неправильно введений пароль або логін' })
      }
   } catch {
      return res.status(500).json({ message: 'Щось пішло не так' })
   }
}

/**
 * 
 * @route POST /api/user/register
 * @desc Реєстрація
 * @access Public
 */

const register = async (req, res) => {

   try {
      const { email, password, name } = req.body
      if (!email || !password || !name) {
         return res.status(400).json({ message: 'Будь ласка, заповніть обов`язкові поля' })
      }

      const registeredUser = await prisma.user.findFirst({
         where: {
            email
         }
      })

      if (registeredUser) {
         return res.status(400).json({ message: 'Користувач з таким ім`ям уже існує' })
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const user = await prisma.user.create({
         data: {
            email,
            name,
            password: hashedPassword
         }
      })

      const secret = process.env.JWT_SECRET

      if (user && secret) {
         res.status(201).json({
            id: user.id,
            email: user.email,
            name,
            token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
         })
      } else {
         return res.status(400).json({ message: 'Не вдалось створити користувача' })
      }
   } catch {
      return res.status(400).json({ message: 'Щось пішло не так' })
   }
}


/**
 * @route POST /api/employes/add
 * @desc Додавання співробітників
 * @access Private
 */
const add = async (req, res) => {
   try {
      const { body } = req
      const data = body

      if (!data.firstName || !data.firstLast || !data.adress || data.age) {
         return res.status(400).json({ message: 'Всі поля обов`язкові' })
      }

      const employee = await prisma.user.update({
         where: {
            id: req.user.id
         },
         data: {
            createdEmployee: {
               create: data
            }
         }
      })

      return res.status(201).json(employee)
   } catch (error) {
      return res.status(500).json({ message: 'Щось пішло не так' })

   }
}


/**
 * 
 * @route GET /api/user/current
 * @desc Текущий користувач
 * @access Private
 */
const current = async (req, res) => {
   return res.status(200).json(req.user)
}

module.exports = {
   login, register, current
}