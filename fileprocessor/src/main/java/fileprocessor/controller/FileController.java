package fileprocessor.controller;

import java.io.IOException;
import java.util.List;

import fileprocessor.entity.FileEntity;
import fileprocessor.service.FileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:3000")
public class FileController {

    @Autowired
    private FileService fileService;

   @PostMapping("/upload")
public String uploadFiles(@RequestParam("file") MultipartFile[] files) throws IOException {
    return fileService.uploadFiles(files);
}
    @GetMapping("/search")
public List<FileEntity> searchFiles(@RequestParam String filename) {
    return fileService.searchFiles(filename);
}
@GetMapping
public List<FileEntity> getAllFiles() {
    return fileService.getAllFiles();
}

@GetMapping("/download/{filename}")
public ResponseEntity<Resource> downloadFile(@PathVariable String filename) throws Exception {

    Path path = Paths.get("C:/File Processor/SpringBoot/fileprocessor/uploads")
            .resolve(filename)
            .normalize();

    if (!path.toFile().exists()) {
        return ResponseEntity.notFound().build();
    }

    Resource resource = new UrlResource(path.toUri());

    return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"" + resource.getFilename() + "\"")
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(resource);
}

@GetMapping("/view/{filename}")
public ResponseEntity<Resource> viewFile(@PathVariable String filename) throws Exception {

    Path path = Paths.get("C:/File Processor/SpringBoot/fileprocessor/uploads")
            .resolve(filename)
            .normalize();

    if (!path.toFile().exists()) {
        return ResponseEntity.notFound().build();
    }

    Resource resource = new UrlResource(path.toUri());

    return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(resource);
}
@DeleteMapping("/{id}")
public ResponseEntity<String> deleteFile(@PathVariable Long id) {
    fileService.deleteFile(id);
    return ResponseEntity.ok("File deleted successfully");
}
}

   

