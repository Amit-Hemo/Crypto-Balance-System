---
name: code-review
description: Technical code review for quality and bugs. Supports incremental (latest) or full project scopes.
---

# Technical Code Review Skill

When reviewing code, perform code review based on the user's requested scope and follow these steps:

## 1. Determine Scope
Identify if the user wants an **Incremental** or **Full** review:
- **Incremental (Latest):** Review only uncommitted changes and new files.
- **Full Project:** Review all tracked files in the repository.

## 2. Gather Context
Before analyzing changes, scan the following to understand project standards:
- `README.md` and `PRD.md` (if present).
- Key files in the `/core` or `/src` modules.
- Any style guides in the `/docs` directory.

## 3. Identify Files
Run the appropriate commands based on the scope:

### For Incremental Review:
```bash
# Get modified and staged files
git diff --name-only HEAD
# Get new (untracked) files
git ls-files --others --exclude-standard
```

### For Full Project Review:
```bash
# Get all tracked files
git ls-files
```

## 4. Analyze Changes
Read the identified files in full.
For each identified file, perform the following checks:

### A. Architecture & Structure
- Does the file follow the established patterns (e.g., MVC, Clean Architecture)?
- Are responsibilities properly separated?
- Is the file size reasonable (ideally < 500 lines)?

### B. Logic
- Does the code implement the logic correctly?
- Are there any edge cases that are not handled?
- Off-by-one errors
- Race conditions?
- Unsafe operations?

### C. Security
- Are secrets (API keys, passwords) hardcoded? (Should be in `.env` or secrets manager)
- Is input validation performed on all external data?
- Are there any SQL injection or XSS vulnerabilities?
- Are proper authentication and authorization checks in place if needed?

### D. Performance
- Are there N+1 query issues?
- Are large loops or inefficient operations used?
- Are proper caching strategies implemented if needed?
- Are there any memory leaks?

### E. Code Quality - Clean Code
- Is the code readable and well-commented (if needed)?
- Are variable and function names descriptive?
- Is there proper error handling and logging?
- Does the code follow best practices?

### F. Testing
- Are there corresponding unit tests for new features?
- Do tests cover edge cases?
- Are mocks and stubs used appropriately?

## 5. Provide Feedback
Structure your review comments clearly:

### A. Summary
Provide a high-level overview of the changes:
- What was implemented
- Major issues found
- Overall quality assessment

### B. Detailed Findings
Group issues by severity:

#### Critical Issues (Must Fix)
- Security vulnerabilities
- Compilation errors
- Major architectural flaws

#### Major Issues (Should Fix)
- Performance problems
- Missing error handling
- Bad practices

#### Minor Issues (Nice to Have)
- Style preferences
- Readability improvements
- Documentation suggestions

### C. Code Examples
For each issue, provide specific code examples:
- Show the problematic code
- Suggest a corrected version
- Explain the reasoning behind the change

## 6. Output
Save the review to `.agent/code-reviews/review-[appropriate-name].md`.

### Format  
Use the following format for your review:

```markdown
## Code Review Report

**Scope:** [Incremental / Full Project]
**Date:** [YYYY-MM-DD]
**Files Reviewed:** [List of files]

### Summary
[High-level overview]

### Critical Issues
1. **[Issue Title]**
   - **File:** [file_path]
   - **Line:** [line_number]
   - **Description:** [Detailed explanation]
   - **Recommendation:** [Code example and reasoning]

### Major Issues
...

### Minor Issues
...

### Recommendations
[General suggestions for improvement]

### Overall Assessment
[Final verdict on code quality]
```

If no issues are found, provide a message indicating that the code is clean and follows best practices.

## Important Rules
- Focus on functional bugs and security over subjective style.
- Always provide a fix, not just a critique.
- If the file is excessively big (>50 files), summarize the directory structure first and ask the user if they want a specific module or proceed with a full audit.