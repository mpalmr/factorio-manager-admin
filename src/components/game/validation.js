import * as Yup from 'yup';

export default {
	name: Yup.string().min(3).required(),
	version: Yup.string().required(),
};
