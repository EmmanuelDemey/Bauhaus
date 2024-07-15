import D, { D1, D2 } from '../../../../i18n';
import { z } from 'zod';
import { formatValidation } from '../../../../new-architecture/utils/validation';

const Family = z.object({
	prefLabelLg1: z.string().min(1, { message: D.mandatoryProperty(D1.title) }),
	prefLabelLg2: z.string().min(1, { message: D.mandatoryProperty(D2.title) }),
});

export const validate = formatValidation(Family);
