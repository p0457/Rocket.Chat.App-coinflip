import {
    IConfigurationExtend, IEnvironmentRead, ILogger,
  } from '@rocket.chat/apps-engine/definition/accessors';
  import { App } from '@rocket.chat/apps-engine/definition/App';
  import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
  import { SettingType } from '@rocket.chat/apps-engine/definition/settings';
  
  import { CoinFlipCommand } from './commands/CoinFlipCommand';
  import { CoinFlipGetter } from './helper/CoinFlipGetter';
  
  export class CoinFlipApp extends App {
    private readonly coinFlipGetter: CoinFlipGetter;
  
    constructor(info: IAppInfo, logger: ILogger) {
      super(info, logger);
      this.coinFlipGetter = new CoinFlipGetter();
    }
  
    protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
      await configuration.settings.provideSetting({
        id: 'coinflip_name',
        type: SettingType.STRING,
        packageValue: 'coinflip',
        required: true,
        public: false,
        i18nLabel: 'Customize_Name',
        i18nDescription: 'Customize_Name_Description',
      });
  
      await configuration.settings.provideSetting({
        id: 'coinflip_icon',
        type: SettingType.STRING,
        packageValue: 'https://raw.githubusercontent.com/tgardner851/Rocket.Chat.App-base64/master/icon.jpg',
        required: true,
        public: false,
        i18nLabel: 'Customize_Icon',
        i18nDescription: 'Customize_Icon_Description',
      });
  
      await configuration.slashCommands.provideSlashCommand(new CoinFlipCommand(this.coinFlipGetter));
    }
  }
  