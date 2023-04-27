import type { Request, Response } from 'express';

function justifyText(text: string, lineLength: number): string {
  const words = text.split(' ');
  let result = '';
  let line = '';
  let remainingSpace = lineLength;

  if (text.length <= lineLength) return text;

  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];

    if (line.length + word.length > lineLength) {
      const numSpaces = line.split(' ').length - 1;
      const totalSpaces = remainingSpace + numSpaces;
      const spacesPerGap = numSpaces > 0 ? Math.floor(totalSpaces / numSpaces) : 0;
      let extraSpaces = numSpaces > 0 ? totalSpaces % numSpaces : remainingSpace;
      const gap = ' '.repeat(spacesPerGap);

      // eslint-disable-next-line no-loop-func
      line = line.replace(/ /g, (_, index) => {
        if (index === line.length - 1) {
          return '';
        }
        extraSpaces -= 1;
        return gap + (extraSpaces > 0 ? ' ' : '');
      });

      result += `${line}\n`;
      line = '';
      remainingSpace = lineLength;
    }

    line += `${word} `;
    remainingSpace -= word.length + 1;
  }

  if (line) {
    result += `${line}\n`;
  }

  return result.trim();
}

export const justify = async (req: Request, res: Response) => {
  const { body, query } = req;
  const { size }: { size?: number } = query;

  if (typeof body !== 'string' || !body || body === '') {
    return res.status(400).json({
      error: 'Missing text',
    });
  }

  const justifiedText = justifyText(body, size || 80);

  return res.status(200).type('text/plain').send(justifiedText);
};
