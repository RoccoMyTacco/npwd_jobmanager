import App from './src/App';
import { AppIcon } from './icon';

const defaultLanguage = 'en';
const localizedAppName = {
  en: 'Job Manager',
};

interface Settings {
  language: 'en';
}

export const path = '/npwd_jobmanager';
export default (settings: Settings) => ({
  id: 'jobmanager',
  path,
  nameLocale: localizedAppName[settings?.language ?? defaultLanguage],
  color: '#fff',
  backgroundColor: '#333',
  icon: AppIcon,
  app: App,
});
