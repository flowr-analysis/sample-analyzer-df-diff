# How to compare dataflow graphs produced by flowR

This is a sample project that demonstrates how to use the [`flowR`](https://github.com/flowr-analysis/flowr) library to analyze and R projects by comparing their dataflow graphs.

Please note that this is a minimal example.

If you want to try this out with docker, you can run the following in your directory (or add paths to your liking)
to use a deployed [docker image](https://hub.docker.com/r/eagleoutice/sample-flowr-df-diff):

```bash
 docker run -it --rm -u "$(id -u):$(id -g)" -v "$PWD":"/data" eagleoutice/sample-flowr-df-diff:latest /data/samples/file-a.R /data/samples/file-b.R
 ```

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
