package com.unir.inventory.web.rest;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api")
public class StressResource {

    @GetMapping("/public/stress/cpu/{seconds}")
    public void stressCPU(@PathVariable(value = "seconds") Long seconds) {
        int numThreads = Runtime.getRuntime().availableProcessors();
        System.out.println("Number of available processors: " + numThreads);

        ExecutorService executorService = Executors.newFixedThreadPool(numThreads);

        for (int i = 0; i < numThreads; i++) {
            executorService.submit(new CPULoadThread());
        }

        // Programa para después de 10 segundos
        ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
        scheduler.schedule(() -> {
            executorService.shutdownNow(); // Interrumpir todos los hilos
        }, seconds, TimeUnit.SECONDS);
    }

    @GetMapping("/public/stress/ram/{seconds}")
    public void stressRAM(@PathVariable(value = "seconds") Long seconds) {
        List<Object> memoryList = new ArrayList<>();
        long startTime = System.currentTimeMillis();

        try {
            while (System.currentTimeMillis() - startTime < seconds*1000) {
                // Create objects and add them to the list to consume memory
                memoryList.add(new Object());
            }
        } catch (OutOfMemoryError e) {
            System.out.println("Out of memory exception caught. Stress test complete.");
        }
    }
    static class CPULoadThread extends Thread {
        @Override
        public void run() {
            while (!Thread.interrupted()) {
                // Perform some heavy computation
                for (int i = 0; i < Integer.MAX_VALUE; i++) {
                    double result = Math.sqrt(i);
                }
            }
        }
    }
}
