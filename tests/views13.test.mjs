import test from 'node:test';
import assert from 'node:assert/strict';
import {premiumView} from '../dist/premium.mjs';
import {seed} from '../src/core.mjs';
test('automation management and about views render with a fresh workspace',()=>{const ctx={state:seed(),can:()=>true};assert.match(premiumView('automations',ctx),/automation_rule/);assert.match(premiumView('about',ctx),/makan20042002@gmail.com/);assert.match(premiumView('about',ctx),/manual-fa.pdf/)});
