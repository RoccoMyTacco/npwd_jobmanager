import App from './src/App';
import { AppIcon } from './icon';

const defaultLanguage = 'en';
const localizedAppName = {
  en: 'Uber Eats',
};

interface Settings {
  language: 'en';
}

export const path = '/npwd_ubereats';
export default (settings: Settings) => ({
  id: 'UBER_EATS',
  path,
  nameLocale: localizedAppName[settings?.language ?? defaultLanguage],
  color: '#fff',
  backgroundColor: '#333',
  icon: AppIcon,
  app: App,
});
