package fileprocessor.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fileprocessor.entity.FileEntity;
import fileprocessor.repository.FileRepository;

    @Service
public class FileService {
    @Autowired
private FileRepository fileRepository;
public String uploadFiles(MultipartFile[] files) throws IOException {

    for (MultipartFile file : files) {

        String uploadDir = System.getProperty("user.dir") + File.separator + "uploads" + File.separator;

        File folder = new File(uploadDir);

        if (!folder.exists()) {
            folder.mkdirs();
        }

        File destination = new File(folder, file.getOriginalFilename());

System.out.println("Saving file to: " + destination.getAbsolutePath());

file.transferTo(destination);

        FileEntity entity = new FileEntity();
        entity.setFilename(file.getOriginalFilename());
        entity.setFiletype(file.getContentType());
        entity.setFilesize(file.getSize());
        entity.setUploadTime(LocalDateTime.now());
        fileRepository.save(entity);
    }

    return "Files uploaded successfully";
}
public List<FileEntity> searchFiles(String filename) {
    return fileRepository.findByFilenameContainingIgnoreCase(filename);
}
public List<FileEntity> getAllFiles() {
    return fileRepository.findAll();
}
public void deleteFile(Long id) {
    fileRepository.deleteById(id);
}
}