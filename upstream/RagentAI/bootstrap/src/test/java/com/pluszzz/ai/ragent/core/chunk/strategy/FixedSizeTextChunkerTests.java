/*
 * Copyright 2026 Pluszzz
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.pluszzz.ai.ragent.core.chunk.strategy;

import com.pluszzz.ai.ragent.core.chunk.ChunkingOptions;
import com.pluszzz.ai.ragent.core.chunk.VectorChunk;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class FixedSizeTextChunkerTests {

    private final TestableFixedSizeTextChunker chunker = new TestableFixedSizeTextChunker();

    @Test
    void splitsTextIntoConfiguredCharacterLengthsWithOverlap() {
        List<VectorChunk> chunks = chunker.split("x".repeat(1000), 512, 128);

        assertEquals(List.of(512, 512, 232), chunks.stream().map(c -> c.getContent().length()).toList());
        assertEquals(List.of(0, 1, 2), chunks.stream().map(VectorChunk::getIndex).toList());
        assertEquals(chunks.get(0).getContent().substring(384), chunks.get(1).getContent().substring(0, 128));
    }

    @Test
    void prefersNewlineWhenItFallsWithinOverlapLookback() {
        String text = "a".repeat(450) + "\n" + "b".repeat(549);

        List<VectorChunk> chunks = chunker.split(text, 512, 128);

        assertTrue(chunks.get(0).getContent().endsWith("\n"));
        assertEquals(451, chunks.get(0).getContent().length());
    }

    private static final class TestableFixedSizeTextChunker extends FixedSizeTextChunker {
        private TestableFixedSizeTextChunker() {
            super(null, List.of());
        }

        private List<VectorChunk> split(String text, int chunkSize, int overlapSize) {
            return super.doChunk(text, ChunkingOptions.builder()
                    .chunkSize(chunkSize)
                    .overlapSize(overlapSize)
                    .build());
        }
    }
}
