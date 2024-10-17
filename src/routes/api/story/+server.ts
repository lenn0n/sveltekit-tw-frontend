import Replicate from "replicate";
import { REPLICATE_API_TOKEN } from '$env/static/private';

export async function POST(event) {
  const replicate = new Replicate({ auth: REPLICATE_API_TOKEN });
  const data = await event.request.json()
  const query = data.query

  const input = {
    "top_k": 0,
    "top_p": 0.95,
    'prompt': query,
    "temperature": 0.7,
    "system_prompt": "You are a helpful assistant",
    "length_penalty": 1,
    "max_new_tokens": 512,
    'min_tokens': 1,
    "presence_penalty": 0,
    "log_performance_metrics": false,
    "stop_sequences": "<|end_of_text|>,<|eot_id|>",
    "prompt_template": "<|begin_of_text|><|start_header_id|>system<|end_header_id|>{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>",
  }

  const stream = new ReadableStream({
    async start(controller) {
      for await (const event of replicate.stream("meta/meta-llama-3-8b-instruct", { input })) {
        controller.enqueue(new TextEncoder().encode(`${event}`));
        //=> "The"
      }
      controller.close();
    },
  });

  // return success
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Transfer-Encoding': 'chunked'
    }
  })
}