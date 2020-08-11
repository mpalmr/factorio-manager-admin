import * as Yup from 'yup';

export default {
	name: Yup
		.string()
		.required('Required')
		.min(3, 'Must be at least three characters'),
	version: Yup.string().required('Required'),
};
