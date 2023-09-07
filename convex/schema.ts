import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	cards: defineTable({
		user: v.id("users"),
		// id: v.number(),
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
	}),
	users: defineTable({
		name: v.string(),
		tokenIdentifier: v.string(),
	}).index("by_token", ["tokenIdentifier"]),
});
