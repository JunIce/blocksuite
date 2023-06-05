import { expect } from '@playwright/test';

import {
  assertMouseMode,
  enterPlaygroundRoom,
  initEmptyEdgelessState,
  setMouseMode,
  switchEditorMode,
  type,
  waitForVirgoStateUpdated,
} from '../utils/actions/index.js';
import { assertEdgelessText } from '../utils/asserts.js';
import { test } from '../utils/playwright.js';

test('add text element in default mode', async ({ page }) => {
  await enterPlaygroundRoom(page);
  await initEmptyEdgelessState(page);

  await switchEditorMode(page);
  await setMouseMode(page, 'default');

  await page.mouse.dblclick(130, 140);
  await waitForVirgoStateUpdated(page);

  await type(page, 'hello');
  await assertEdgelessText(page, 'hello');
  await assertMouseMode(page, 'default');

  await page.mouse.click(120, 140);

  expect(await page.locator('surface-text-editor').count()).toBe(0);

  await page.mouse.dblclick(145, 155);
  await page.locator('surface-text-editor').waitFor({
    state: 'attached',
  });
  await type(page, 'hello');
  await assertEdgelessText(page, 'hellohello');

  await page.mouse.click(145, 155);
  await type(page, 'ddd\n');
  await assertEdgelessText(page, 'hddd\nellohello');
});

test('add text element in text mode', async ({ page }) => {
  await enterPlaygroundRoom(page);
  await initEmptyEdgelessState(page);

  await switchEditorMode(page);
  await setMouseMode(page, 'text');

  await page.mouse.click(130, 140);
  await waitForVirgoStateUpdated(page);

  await type(page, 'hello');
  await assertEdgelessText(page, 'hello');
  await assertMouseMode(page, 'default');

  await page.mouse.click(120, 140);

  expect(await page.locator('surface-text-editor').count()).toBe(0);

  await page.mouse.dblclick(145, 155);
  await page.locator('surface-text-editor').waitFor({
    state: 'attached',
  });
  await type(page, 'hello');
  await assertEdgelessText(page, 'hellohello');

  await page.mouse.click(145, 155);
  await type(page, 'ddd\n');
  await assertEdgelessText(page, 'hddd\nellohello');
});
