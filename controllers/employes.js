const { prisma } = require('../prisma/prisma-client')
/**
 * @route GET /api/employes
 * @desc Отримання всіх співробітників
 * @access Private
 */
const all = async (req, res) => {
   try {
      const employes = await prisma.employee.findMany()

      res.status(200).json(employes)
   } catch {
      res.status(500).json({ message: 'Не вдалось отримати співробітника' })
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
      const { firstName, lastName, address, age } = data

      if (!firstName || !lastName || !address || !age) {
         return res.status(400).json({ message: 'Всі поля обов`язкові' })
      }

      const employee = await prisma.employee.create({
         data: {
            ...data,
            userId: req.user.id
         }
      })


      return res.status(201).json(employee)
   } catch (error) {
      return res.status(500).json({ message: 'Щось пішло не так' })
   }
}


/**
 * @route POST /api/employes/remove/id
 * @desc Видалення співробітника
 * @access Private
 */
const remove = async (req, res) => {
   const { id } = req.body;

   try {
      await prisma.employee.delete({
         where: {
            id,
         },
      });

      res.status(200).json({ message: 'Співробітника виадлено' });
   } catch (error) {
      return res.status(500).json({ message: 'Невдалось видалити співробітника' });
   }
};




/**
 * @route PUT /api/employes/edit/id
 * @desc Редагування співробітника
 * @access Private
 */
const edit = async (req, res) => {
   const data = req.body;
   const id = data.id;

   try {
      await prisma.employee.update({
         where: {
            id
         },
         data
      });

      res.status(200).json({ message: 'Користувача змінено' });
   } catch (error) {
      return res.status(500).json({ message: 'Невдалось редагувати співробітника' });
   }
};


/**
 * @route PUT /api/employes/:id
 * @desc Отримання співробітника
 * @access Private
 */
const employee = async (req, res) => {
   const { id } = req.params

   try {
      const employee = await prisma.employee.findUnique({
         where: {
            id,
         },
      })

      res.status(200).json(employee)
   } catch (error) {
      return res.status(500).json({ message: 'Невдалось отримати співробітника' })
   }
}
module.exports = {
   all, add, employee, remove, edit
}