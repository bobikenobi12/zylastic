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
		}
	) => {
		const newCardId = await ctx.db.insert("cards", {
			content,
			image,
			strenght,
			dexterity,
			intelligence,
			endurance,
			luck,
			cost,
		});
		return newCardId;
	},
});
