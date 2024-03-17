#!/usr/bin/env node

import { Rula } from "../lib/rula.js";

const rula = new Rula();
await rula.recordScore();
rula.result();
