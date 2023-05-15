int main(int argc, char *argv[]) {
    ShadowEngine::ShadowApplication app(argc, argv);
    app.Init();
    app.Start();

    return argc == 3 ? EXIT_SUCCESS : EXIT_FAILURE; // optional return value
}