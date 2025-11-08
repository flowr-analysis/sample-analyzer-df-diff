# How to compare dataflow graphs produced by flowR

This is a sample project that demonstrates how to use the [`flowR`](https://github.com/flowr-analysis/flowr) library to analyze and R projects by comparing their dataflow graphs.

Please note that this is a minimal example.

## Quickstart

1. Clone the repository:

   ```bash
   git clone https://github.com/flowr-analysis/sample-analyzer-df-diff.git
   cd sample-analyzer-df-diff
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the main script with a project folder and a file to dump the results to:

   ```bash  
   npm run main -- samples/file-a.R samples/file-b.R
   ```

4. Check out the link produced in the console to view the differences between the dataflow graphs.
