```cpp
#include <iostream>
#include <thread>
#include <chrono>
#include <functional>

class JobScheduler {
public:
    template <class callable, class... arguments>
    JobScheduler(int after, bool async, callable&& f, arguments&&... args) {
        std::function<typename std::result_of<callable(arguments...)>::type()> task(std::bind(std::forward<callable>(f), std::forward<arguments>(args)...));

        if (async) {
            std::thread([after, task]() {
                std::this_thread::sleep_for(std::chrono::seconds(after));
                task();
            }).detach();
        } else {
            std::this_thread::sleep_for(std::chrono::seconds(after));
            task();
        }
    }
};

void printMessage() {
    std::cout << "Job executed after delay" << std::endl;
}

int main() {
    JobScheduler(5, true, printMessage);
    std::cout << "Job scheduled, waiting for execution" << std::endl;
    std::this_thread::sleep_for(std::chrono::seconds(10));
    return 0;
}
```