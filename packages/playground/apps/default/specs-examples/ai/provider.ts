import { assertExists } from '@blocksuite/global/utils';
import { AIProvider } from '@blocksuite/presets';

import { textToTextStream } from './request';

export function setupAIProvider() {
  AIProvider.provideAction('chat', options => {
    assertExists(options.stream);
    return textToTextStream({
      docId: options.docId,
      workspaceId: options.workspaceId,
      prompt: options.input,
    });
  });

  AIProvider.provideAction('summary', options => {
    assertExists(options.stream);
    const prompt = `
    Summarize the key points from the following content in a clear and concise manner,
    suitable for a reader who is seeking a quick understanding of the original content.
    Ensure to capture the main ideas and any significant details without unnecessary elaboration:
  
    ${options.input}
    `;
    return textToTextStream({
      docId: options.docId,
      workspaceId: options.workspaceId,
      prompt,
    });
  });

  AIProvider.provideAction('translate', options => {
    assertExists(options.stream);
    const prompt = `Please translate the following content into ${options.lang} and return it to us, adhering to the original format of the content：

    ${options.input}
    `;
    return textToTextStream({
      docId: options.docId,
      workspaceId: options.workspaceId,
      prompt,
    });
  });

  AIProvider.provideAction('changeTone', options => {
    assertExists(options.stream);
    const prompt = `Change the tone of the following content to ${options.tone}: ${options.input}`;
    return textToTextStream({
      docId: options.docId,
      workspaceId: options.workspaceId,
      prompt,
    });
  });

  AIProvider.provideAction('improveWriting', options => {
    assertExists(options.stream);
    const prompt = `Improve the writing of the following content: ${options.input}`;
    return textToTextStream({
      docId: options.docId,
      workspaceId: options.workspaceId,
      prompt,
    });
  });

  AIProvider.provideAction('improveGrammar', options => {
    assertExists(options.stream);
    const prompt = `Improve the grammar of the following content: ${options.input}`;
    return textToTextStream({
      docId: options.docId,
      workspaceId: options.workspaceId,
      prompt,
    });
  });

  AIProvider.provideAction('fixSpelling', options => {
    assertExists(options.stream);
    const prompt = `Fix the spelling of the following content: ${options.input}`;
    return textToTextStream({
      docId: options.docId,
      workspaceId: options.workspaceId,
      prompt,
    });
  });

  AIProvider.provideAction('createHeadings', options => {
    assertExists(options.stream);
    const prompt = `Create headings for the following content: ${options.input}`;
    return textToTextStream({
      docId: options.docId,
      workspaceId: options.workspaceId,
      prompt,
    });
  });

  AIProvider.provideAction('makeLonger', options => {
    assertExists(options.stream);
    const prompt = `Make the following content longer: ${options.input}`;
    return textToTextStream({
      docId: options.docId,
      workspaceId: options.workspaceId,
      prompt,
    });
  });

  AIProvider.provideAction('makeShorter', options => {
    assertExists(options.stream);
    const prompt = `Make the following content shorter: ${options.input}`;
    return textToTextStream({
      docId: options.docId,
      workspaceId: options.workspaceId,
      prompt,
    });
  });

  AIProvider.provideAction('checkCodeErrors', options => {
    assertExists(options.stream);
    const prompt = `Check the code errors in the following content and provide the corrected version:

    """
    ${options.input}
    """
    `;
    return textToTextStream({
      docId: options.docId,
      workspaceId: options.workspaceId,
      prompt,
    });
  });

  AIProvider.provideAction('explainImage', options => {
    assertExists(options.stream);
    const prompt = `Describe the scene captured in this image, focusing on the details, colors, emotions, and any interactions between subjects or objects present.`;
    return textToTextStream({
      docId: options.docId,
      workspaceId: options.workspaceId,
      prompt,
      attachments: options.attachments,
    });
  });
}
