import { 
    GuardFunction,
    ArgsOf 
} from "discordx";

export function Prefix(text: string) {
  const guard: GuardFunction<ArgsOf<"messageCreate">> = async (arg, _, next) => {
    const message = arg instanceof Array ? arg[0] : arg;;
    const startWith = message.content.startsWith(text);

    if (startWith)
        await next();
  };

  return guard;
}