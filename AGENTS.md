# Vastness

Read CONTEXT.md, relevant docs/adr, and docs/exploration.md before implementation. The user brief is docs/brief.md. Current delivery contract is docs/specs/milestone-zero.md.

## Agent skills

### Issue tracker
GitHub Issues in sebboseb/vastness; see docs/agents/issue-tracker.md.

### Triage labels
Default five-role vocabulary; see docs/agents/triage-labels.md.

### Domain docs
Single-context glossary and root ADRs; see docs/agents/domain.md.

## Autonomous execution
User authorizes routine local changes, worktrees, services, research, commits, tracker updates, and independent implementation subagents. Their explicit autonomous policy overrides routine approval gates in workflow skills. Ask only at the boundaries specified in docs/brief.md. Follow docs/agents/conductor.md when dispatching tickets.

Use meaningful behavioral tests at HTTP, player movement, and browser acceptance seams. Run focused tests during development and npm run check before integration. Worker tests use Python unittest. Keep exact shared protocol names in docs/exploration.md; serialize changes to protocol and central config. Product code on the GPU PC is deployed from Git commits. Heavy worker jobs run one at a time.
