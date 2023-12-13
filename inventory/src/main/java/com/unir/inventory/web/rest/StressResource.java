package com.unir.inventory.web.rest;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api")
public class StressResource {

    @GetMapping("/public/stress/{seconds}")
    public void searchProducts(@PathVariable(value = "seconds") Long seconds) {
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
