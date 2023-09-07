import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const InsertCard = mutation({
	args: {
		content: v.string(),
		image: v.string(),
		strenght: v.number(),
		dexterity: v.number(),
		intelligence: v.number(),
		endurance: v.number(),
		luck: v.number(),
		arcane: v.number(),
		vigor: v.number(),
		vitality: v.number(),
		cost: v.number(),
	},
	handler: async (
		ctx,
		{
			content,
			image,
			strenght,
			dexterity,
			intelligence,
			endurance,
			luck,
			cost,
			arcane,
			vigor,
			vitality,
		}
	) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Unathenticated to call mutation");
		}
		const user = await ctx.db
			.query("users")
			.withIndex("by_token", (q) =>
				q.eq("tokenIdentifier", identity.tokenIdentifier)
			)
			.unique();

		if (!user) {
			throw new Error("User not found");
		}

		const newCardId = await ctx.db.insert("cards", {
			user: user._id,
			content,
			image,
			strenght,
			dexterity,
			intelligence,
			endurance,
			luck,
			arcane,
			vigor,
			vitality,
			cost,
		});
		return newCardId;
	},
});
