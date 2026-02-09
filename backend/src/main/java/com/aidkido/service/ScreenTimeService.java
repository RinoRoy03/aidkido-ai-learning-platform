package com.aidkido.service;

import com.aidkido.model.ScreenTime;
import com.aidkido.repository.ScreenTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ScreenTimeService {

    private static final int DAILY_LIMIT = 30 * 60;

    @Autowired
    private ScreenTimeRepository repo;

    public int tick(Long userId) {

        LocalDate today = LocalDate.now();

        ScreenTime st = repo
                .findByUserIdAndDate(userId, today)
                .orElseGet(() -> {
                    ScreenTime s = new ScreenTime();
                    s.setUserId(userId);
                    s.setDate(today);
                    s.setSecondsUsed(0);
                    return s;
                });

        st.setSecondsUsed(st.getSecondsUsed() + 1);

        repo.save(st);

        return DAILY_LIMIT - st.getSecondsUsed();
    }

    public int getRemaining(Long userId) {

        LocalDate today = LocalDate.now();

        return repo
                .findByUserIdAndDate(userId, today)
                .map(s -> DAILY_LIMIT - s.getSecondsUsed())
                .orElse(DAILY_LIMIT);
    }
}
