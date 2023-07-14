import { z } from "zod";
import { PrismaClientExtensionType } from "./prisma.server";

export const UserFeatureFlagsSchema = z
  .object({
    EXAMPLE_FEATURE_FLAG: z.boolean().optional(),
  })
  .default({});

export type UserFeatureFlags = z.infer<typeof UserFeatureFlagsSchema>;

/**
 * This extension applies the `zod` schema defined above to the user feature flags.
 *
 * It also makes it fully type safe even at runtime!
 */
export const userFeatureFlagExtension = (client: PrismaClientExtensionType) =>
  client.$extends({
    result: {
      user: {
        featureFlags: {
          needs: { featureFlags: true },
          compute({ featureFlags }) {
            return UserFeatureFlagsSchema.parse(featureFlags);
          },
        },
      },
    },

    query: {
      user: {
        create({ args, query }) {
          args.data.featureFlags = UserFeatureFlagsSchema.parse(
            args.data.featureFlags,
          );
          return query(args);
        },
        createMany({ args, query }) {
          const users = Array.isArray(args.data) ? args.data : [args.data];
          for (const user of users) {
            user.featureFlags = UserFeatureFlagsSchema.parse(user.featureFlags);
          }
          return query(args);
        },
        update({ args, query }) {
          if (args.data.featureFlags !== undefined) {
            args.data.featureFlags = UserFeatureFlagsSchema.parse(
              args.data.featureFlags,
            );
          }
          return query(args);
        },
        updateMany({ args, query }) {
          if (args.data.featureFlags !== undefined) {
            args.data.featureFlags = UserFeatureFlagsSchema.parse(
              args.data.featureFlags,
            );
          }
          return query(args);
        },
        upsert({ args, query }) {
          args.create.featureFlags = UserFeatureFlagsSchema.parse(
            args.create.featureFlags,
          );
          if (args.update.featureFlags !== undefined) {
            args.update.featureFlags = UserFeatureFlagsSchema.parse(
              args.update.featureFlags,
            );
          }
          return query(args);
        },
      },
    },
  });
