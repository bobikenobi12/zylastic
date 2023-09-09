import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { internalMutation, mutation, query } from "./_generated/server";

export const InsertCard = mutation({
	args: {},
	handler: async (ctx, {}) => {
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
			content: "",
			image: "",
			prompt: "",
			strenght: 0,
			dexterity: 0,
			intelligence: 0,
			endurance: 0,
			luck: 0,
			arcane: 0,
			vigor: 0,
			vitality: 0,
			cost: 0,
		});

		return newCardId;
	},
});

export const sendDallEMessage = internalMutation(
	async (
		ctx,
		{
			body,
			cardId,
			prompt,
		}: { body: string; cardId: Id<"cards">; prompt: string }
	) => {
		await ctx.db.patch(cardId, {
			prompt,
			image: body,
		});
	}
);

export const ListCards = query({
	args: {},
	handler: async (ctx, {}) => {
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

		const cards = await ctx.db
			.query("cards")
			.withIndex("by_user", (q) => q.eq("user", user._id));

		return cards;
	},
});

export const GetCard = query({
	args: {
		cardId: v.string(),
	},
	handler: async (ctx, { cardId }) => {
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

		return await ctx.db.get(cardId as Id<"cards">);
	},
});
