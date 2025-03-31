package com.demo.crupapp.Controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
public class WelcomeController {

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome to my Blog! Where I Share my stories, maybe a poem here and there, and hopefully connect with others. Enjoy!" ;
    }
}
