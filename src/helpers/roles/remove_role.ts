import { botID } from "../../bot.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { Errors } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import {
  isHigherPosition,
  requireBotGuildPermissions,
} from "../../util/permissions.ts";

/** Remove a role from the member */
export async function removeRole(
  guildID: string,
  memberID: string,
  roleID: string,
  reason?: string,
) {
  const isHigherRolePosition = await isHigherPosition(
    guildID,
    botID,
    roleID,
  );
  if (
    !isHigherRolePosition
  ) {
    throw new Error(Errors.BOTS_HIGHEST_ROLE_TOO_LOW);
  }

  await requireBotGuildPermissions(guildID, ["MANAGE_ROLES"]);

  const result = await RequestManager.delete(
    endpoints.GUILD_MEMBER_ROLE(guildID, memberID, roleID),
    { reason },
  );

  return result;
}
