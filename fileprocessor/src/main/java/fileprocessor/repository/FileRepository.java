package fileprocessor.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import fileprocessor.entity.FileEntity;

public interface FileRepository extends JpaRepository<FileEntity, Long> {

    List<FileEntity> findByFilenameContainingIgnoreCase(String filename);

}