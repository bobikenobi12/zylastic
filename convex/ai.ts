"use node";

import fetch from "node-fetch";
import { OpenAI } from "openai";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

export const send = action(
	async (
		ctx,
		{ prompt, cardId }: { prompt: string; cardId: Id<"cards"> }
	) => {
		const apiKey = process.env.OPENAI_API_KEY;
		if (!apiKey) {
			throw new Error(
				"Add your OPENAI_API_KEY as an env variable in the " +
					"[dashboard](https://dasboard.convex.dev)"
			);
		}
		const openai = new OpenAI({ apiKey });

		// Check if the prompt is offensive.
		const modResponse = await openai.moderations.create({
			input: prompt,
		});
		const modResult = modResponse.results[0];
		if (modResult.flagged) {
			throw new Error(
				`Your prompt was flagged: ${JSON.stringify(
					modResult.categories
				)}`
			);
		}

		// Query OpenAI for the image.
		const opanaiResponse = await openai.images.generate({
			prompt,
			size: "256x256",
		});
		const dallEImage = opanaiResponse.data[0];

		// Download the image
		const imageResponse = await fetch(dallEImage.url as string);
		if (!imageResponse.ok) {
			throw new Error(`failed to download: ${imageResponse.statusText}`);
		}

		// Store the image to Convex storage.
		const image = await imageResponse.blob();
		// TODO update storage.store to accept whatever kind of Blob is returned from node-fetch
		const storageId = await ctx.storage.store(image as Blob);

		// Write storageId as the body of the message to the Convex database.
		await ctx.runMutation(internal.cards.sendDallEMessage, {
			body: storageId,
			cardId,
			prompt,
		});
	}
);
