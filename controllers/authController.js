const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'تم إنشاء الحساب بنجاح', user });
    } catch (error) {
        res.status(500).json({ message: 'خطأ في إنشاء الحساب' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, role: user.role }, 'secret_key', { expiresIn: '1h' });
            res.status(200).json({ message: 'تم تسجيل الدخول بنجاح', token });
        } else {
            res.status(401).json({ message: 'بيانات الدخول غير صحيحة' });
        }
    } catch (error) {
        res.status(500).json({ message: 'خطأ في تسجيل الدخول' });
    }
};
