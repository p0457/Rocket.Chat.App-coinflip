import { IHttp, IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';

import { CoinFlipGetter } from '../helper/CoinFlipGetter';
import { CoinFlipResult } from '../helper/CoinFlipResult';

export class CoinFlipCommand implements ISlashCommand {
    public command: string = 'coinflip';
    public i18nParamsExample: string = 'Slash_Command_Params_Example';
    public i18nDescription: string = 'Slash_Command_Description';
    public providesPreview: boolean = false;

    constructor(private readonly coinFlipGetter: CoinFlipGetter) { }

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<void> {
        const icon = await read.getEnvironmentReader().getSettings().getValueById('coinflip_icon');
        const username = await read.getEnvironmentReader().getSettings().getValueById('coinflip_name');

        let result = new CoinFlipResult();
        result = await this.coinFlipGetter.flip();
        const text = 'Coin was flipped! Looks like it was ' + result.result;

        const builder = modify.getCreator().startMessage()
            .setSender(context.getSender()).setRoom(context.getRoom())
            .setText(text).setUsernameAlias(username).setAvatarUrl(icon);

        // Respond back to user in room 
        await modify.getCreator().finish(builder);

        return;
    }
}
