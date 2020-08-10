import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const sharedValidation = {
	name: Yup.string().min(3).required(),
	version: Yup.string().required(),
};
