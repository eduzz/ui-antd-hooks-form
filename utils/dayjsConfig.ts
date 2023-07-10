import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';

import 'dayjs/locale/en';
import 'dayjs/locale/pt-br';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

dayjs.locale('pt-br');
