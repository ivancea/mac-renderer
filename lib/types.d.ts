declare module "html-pdf-node" {
  export function generatePdf(file: { content: string }, options?: Options): Promise<Buffer>;
}
