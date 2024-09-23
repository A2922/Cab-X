// utils/findShortestPath.js
import Edge from "../models/edgeModel.js";

const findShortestPath = async (source, destination) => {
    console.log(`Finding shortest path from ${source} to ${destination}`);

    try {
        // Fetch all edges from the database
        const edges = await Edge.find();
        
        // Build the graph
        const graph = {};
        edges.forEach(edge => {
            if (!graph[edge.source]) {
                graph[edge.source] = {};
            }
            graph[edge.source][edge.destination] = edge.duration;
        });

        // Dijkstra's algorithm
        const distances = {};
        const previous = {};
        const priorityQueue = new PriorityQueue();
        const visited = new Set();

        // Initialize distances with infinity, except for the source
        for (const vertex in graph) {
            distances[vertex] = Infinity;
            previous[vertex] = null;
        }
        distances[source] = 0;

        // Enqueue source with priority 0
        priorityQueue.enqueue(source, 0);

        while (!priorityQueue.isEmpty()) {
            const currentVertex = priorityQueue.dequeue().element;

            if (currentVertex === destination) {
                break;
            }

            if (visited.has(currentVertex)) {
                continue;
            }
            visited.add(currentVertex);

            for (const neighbor in graph[currentVertex]) {
                const distance = graph[currentVertex][neighbor];
                const totalDistance = distances[currentVertex] + distance;

                if (totalDistance < distances[neighbor]) {
                    distances[neighbor] = totalDistance;
                    previous[neighbor] = currentVertex;
                    priorityQueue.enqueue(neighbor, totalDistance);
                }
            }
        }

        // Reconstruct the shortest path
        const shortestPath = [];
        let currentVertex = destination;
        while (currentVertex !== null) {
            shortestPath.unshift(currentVertex);
            currentVertex = previous[currentVertex];
        }

        console.log(`Shortest path: ${shortestPath.join(" -> ")}`);

        // Return the shortest path and its duration
        return { path: shortestPath, duration: distances[destination] };
    } catch (err) {
        throw new Error("Error finding shortest path: " + err.message);
    }
};

// Example priority queue implementation
class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        this.items.push({ element, priority });
        this.items.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

export default findShortestPath;
