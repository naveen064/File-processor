package fileprocessor.service;

import java.util.List;

import fileprocessor.entity.FileEntity;
import fileprocessor.repository.FileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

    public FileEntity saveFile(FileEntity file) {
        return fileRepository.save(file);
    }

    public List<FileEntity> getAllFiles() {
        return fileRepository.findAll();
    }
}