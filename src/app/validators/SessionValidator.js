import * as Yup from 'yup';

export default {
  async store(req, res, next) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
      });
      await schema.validate(req.body, { abortEarly: false });
      return next();
    } catch (error) {
      return res
        .status(400)
        .json({ error: 'Validation Fails', messages: error.inner });
    }
  },
};
