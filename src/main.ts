import { FlowrAnalyzerBuilder } from '@eagleoutice/flowr/project/flowr-analyzer-builder';
import { fileProtocol, requestFromInput } from '@eagleoutice/flowr/r-bridge/retriever.js';
import { log, LogLevel } from '@eagleoutice/flowr/util/log';
import {diffOfDataflowGraphs} from "@eagleoutice/flowr/dataflow/graph/diff-dataflow-graph";
import {diffGraphsToMermaidUrl, graphToMermaidUrl} from "@eagleoutice/flowr/util/mermaid/dfg";
import {ProblematicDiffInfo} from "@eagleoutice/flowr/util/diff-graph";
import {NodeId} from "@eagleoutice/flowr/r-bridge/lang-4.x/ast/model/processing/node-id";


function mapProblematicNodesToIds(problematic: readonly ProblematicDiffInfo[] | undefined): Set<NodeId> | undefined {
    return problematic === undefined ? undefined : new Set(problematic.map(p => p.tag === 'vertex' ? String(p.id) : `${p.from}->${p.to}`));
}

async function main(fileA: string, fileB: string) {
   log.updateSettings(s => {
      s.settings.minLevel = LogLevel.Fatal;
   });

   const analyzer = await new FlowrAnalyzerBuilder()
      .setEngine('tree-sitter')
      .add(fileProtocol + fileA)
      .build();
      
   const graphA = await analyzer.dataflow();
   
   analyzer.reset();
   
   // as an alternative, load the other file 
   analyzer.context().addRequest(requestFromInput(fileProtocol + fileB));
   
   const graphB = await analyzer.dataflow();
   
   const report = diffOfDataflowGraphs({
       name: fileA, graph: graphA.graph
   }, {
       name: fileB, graph: graphB.graph
   });

    console.log(`Differences:\n * ${report.comments()?.join('\n * ') ?? ''}`);

    const diff = diffGraphsToMermaidUrl(
        { label: fileA, graph: graphA.graph, mark: mapProblematicNodesToIds(report.problematic()) },
        { label: fileB, graph: graphB.graph, mark: mapProblematicNodesToIds(report.problematic()) },
        '%% Diff of DFGs\n'
    );
    console.log(`Mermaid URL for diff:\n${diff}`);
}


if(process.argv.length < 4) {
   console.error('Usage: ts-node src/main.ts <fileA> <fileB>');
   process.exit(1);
}

const fileA = process.argv[2];
const fileB = process.argv[3];

void main(fileA, fileB).catch(err => {
   console.error('Error during analysis:', err);
   process.exit(1);
});