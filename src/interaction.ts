import type { FastifyReply, FastifyRequest } from "fastify";
import {
	ApplicationCommandInteractionDataOption,
	Interaction as IInteraction,
	InteractionResponse,
	InteractionType,
	OptionType,
} from "./definitions";
import { PermissionFlags } from "./data/messages";
import Embed from "./components/embed";

type InteractionReply = {
	message: string | null;
	embed: Embed | Embed[] | null;
	ephemeral: boolean;
};

export default class Interaction {
	public readonly type: InteractionType;
	public readonly name: string | undefined;
	public readonly response: FastifyReply;
	readonly #options: Map<string, ApplicationCommandInteractionDataOption>;

	constructor(
		request: FastifyRequest<{ Body: IInteraction }>,
		response: FastifyReply
	) {
		this.response = response;

		this.type = request.body.type;
		this.name = request.body.data?.name?.toLowerCase();

		this.#options = new Map();

		request.body?.data?.options?.forEach((option) => {
			this.#options.set(option.name.toLowerCase(), option);
		});
	}

	// TODO: Type? Should return an object where keys = #options keys, and value = ApplicationCommandInteractionDataOption
	get options() {
		return new Proxy(
			{},
			{
				get: (target, property): OptionType | null => {
					return this.#options.get(property.toString())?.value ?? null;
				},
			}
		);
	}

	reply({ message, embed, ephemeral = false }: InteractionReply) {
		const data: InteractionResponse["data"] = {};

		if (message != null) {
			data.content = message;
		}

		if (embed != null) {
			data.embeds = ([] as Embed[])
				.concat(embed)
				.map((item) => item.serialize());
		}

		const payload: InteractionResponse = {
			type: 4,
			data,
		};

		if (ephemeral && payload.data) {
			payload.data.flags = PermissionFlags.EPHEMERAL;
		}

		return this.response.status(200).send(payload);
	}
}
