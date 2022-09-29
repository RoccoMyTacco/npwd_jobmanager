import App from './src/App';
import { AppIcon } from './icon';

const defaultLanguage = 'en';
const localizedAppName = {
  en: 'Job Manager',
};

interface Settings {
  language: 'en';
}

export default (settings: Settings) => ({
  id: 'jobmanager',
  path: '/jobmanager',
  nameLocale: localizedAppName[settings?.language ?? defaultLanguage],
  color: '#fff',
  backgroundColor: '#6600a6',
  icon: AppIcon,
  app: App,
});
