package fileprocessor.controller;

import java.util.List;

import fileprocessor.entity.FileEntity;
import fileprocessor.service.FileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:3000")
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping
    public FileEntity uploadFile(@RequestBody FileEntity file) {
        return fileService.saveFile(file);
    }

    @GetMapping
    public List<FileEntity> getAllFiles() {
        return fileService.getAllFiles();
    }
}