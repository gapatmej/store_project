package com.unir.store;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.unir.store");

        noClasses()
            .that()
            .resideInAnyPackage("com.unir.store.service..")
            .or()
            .resideInAnyPackage("com.unir.store.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..com.unir.store.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
